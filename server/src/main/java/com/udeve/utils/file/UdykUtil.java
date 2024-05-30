package com.udeve.utils.file;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "udyk")
public class UdykUtil {

    public static String uploadDir;

    public static String filestorePath;

    public static String getUploadDir() {
        return uploadDir;
    }

    public void setUploadDir(String uploadDir) {
        UdykUtil.uploadDir = uploadDir;
    }

    public static String getFilestorePath() {
        return filestorePath;
    }

    public void setFilestorePath(String filestorePath) {
        UdykUtil.filestorePath = filestorePath;
    }
}
