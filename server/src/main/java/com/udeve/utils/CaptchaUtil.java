package com.udeve.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.Base64Utils;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Component
public class CaptchaUtil {

    private static final int WIDTH = 120;               // 验证码图片宽度
    private static final int HEIGHT = 50;              // 验证码图片高度
    private static final int CODE_COUNT = 4;           // 验证码长度

    private static final String KEY_PREFIX = "captcha:";         // Redis中验证码键的前缀
    private static final int EXPIRE_SECONDS = 300;               // 验证码过期时间（单位：秒）

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    /**
     * 生成验证码图片并保存到Redis中
     *
     * @param uuid 验证码唯一标识
     * @return 验证码图片的Base64编码字符串
     * @throws IOException 图片IO异常
     */
    // 传入BufferedImage对象，并将生成好的验证码保存到BufferedImage中
    public String generateCaptcha(String uuid)  throws IOException {
        BufferedImage image = new BufferedImage(WIDTH, HEIGHT, BufferedImage.TYPE_INT_RGB);

        Graphics2D graphics = image.createGraphics();
        //设置画笔颜色-验证码背景色
        graphics.setColor(Color.WHITE);
        //填充背景
        graphics.fillRect(0, 0, WIDTH, HEIGHT);
        graphics.setFont(new Font("微软雅黑", Font.BOLD, 40));

        //数字和字母的组合
        String baseNumLetter = "2345679abcdefghjkmnpqrstuvwxyzACDEFGHJKMNPQRSTUVWXYZ";

        StringBuilder builder = new StringBuilder();
        //旋转原点的 x 坐标
        int x = 10;
        String ch;
        Random random = new Random();

        for (int i = 0; i < 4; i++) {
            graphics.setColor(getRandomColor());

            //设置字体旋转角度,角度小于30度
            int degree = random.nextInt() % 30;
            int dot = random.nextInt(baseNumLetter.length());

            ch = baseNumLetter.charAt(dot) + "";
            builder.append(ch);

            //正向旋转
            graphics.rotate(degree * Math.PI / 180, x, 25);
            graphics.drawString(ch, x, 45);

            //反向旋转
            graphics.rotate(-degree * Math.PI / 180, x, 25);
            x += 28;
        }

        //画干扰线
        for (int i = 0; i < 6; i++) {
            // 设置随机颜色
            graphics.setColor(getRandomColor());

            // 随机画线
            graphics.drawLine(random.nextInt(WIDTH), random.nextInt(HEIGHT),
                    random.nextInt(WIDTH), random.nextInt(HEIGHT));

        }

        //添加噪点
        for (int i = 0; i < 30; i++) {
            int x1 = random.nextInt(WIDTH);
            int y1 = random.nextInt(HEIGHT);

            graphics.setColor(getRandomColor());
            graphics.fillRect(x1, y1, 2, 2);
        }
        graphics.dispose();
        String code = String.valueOf(builder).toLowerCase();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ImageIO.write(image, "PNG", outputStream);

        String base64Img = Base64Utils.encodeToString(outputStream.toByteArray());
        String key = KEY_PREFIX + uuid;
        stringRedisTemplate.opsForValue().set(key, code, EXPIRE_SECONDS, TimeUnit.SECONDS);
        return base64Img;
    }

    /**
     * 随机取色
     */
    private static Color getRandomColor() {
        Random ran = new Random();
        return new Color(ran.nextInt(256),
                ran.nextInt(256), ran.nextInt(256));

    }

    /**
     * 验证用户输入的验证码是否正确
     *
     * @param uuid   验证码唯一标识
     * @param captcha 用户输入的验证码
     * @return 验证结果
     */
    public boolean validateCaptcha(String uuid, String captcha) {
        if(captcha==null || ("").equals(captcha)){
            return false;
        }
        String key = KEY_PREFIX + uuid;
        String storedCaptcha = stringRedisTemplate.opsForValue().get(key);
        if (storedCaptcha != null && storedCaptcha.equals(captcha.toLowerCase())) {
            stringRedisTemplate.delete(key);
            return true;
        }
        stringRedisTemplate.delete(key);
        return false;
    }

}
