package com.udeve.service;
/**
 * +----------------------------------------------------------------------
 * | 友得云客  - 开启房产营销新纪元
 * +----------------------------------------------------------------------
 * | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
 * +----------------------------------------------------------------------
 * | Licensed 友得云客不是自有软件 未经允许不可移除相关版权
 * +----------------------------------------------------------------------
 * | Author: www.youdeyunke.com
 * +----------------------------------------------------------------------
 */

import cn.hutool.core.util.ObjectUtil;
import com.alibaba.fastjson.JSONObject;
import com.udeve.entity.*;
import com.udeve.repository.*;
import com.udeve.request.AdminAnswerCreateRequest;
import com.udeve.request.QuestionCreateRequest;
import com.udeve.request.QuestionQueryRequest;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.*;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private AnswerRepository answerRepository;
    @Autowired
    private QuestionFollowerRepository questionFollowerRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    BrokerProfileService brokerProfileService;
    @Autowired
    SysMessageService sysMessageService;
    @Autowired
    AdminLogService adminLogService;

    public Page<Question> getListing(QuestionQueryRequest query){
        Specification<Question> specification = (Specification<Question>)(Root<Question> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            //增加一个id大于0的默认条件
            predicates.add(criteriaBuilder.greaterThan(root.get("id"), 0));
            if (!ObjectUtil.equals(query.getKw(), null)) {
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(root.get("content"), "%" + query.getKw() + "%")
                ));
            }
            if (!ObjectUtil.equals(query.getTargetType(), null)) {
                predicates.add(criteriaBuilder.equal(root.get("targetType"), query.getTargetType()));
            }
            if (!ObjectUtil.equals(query.getTargetId(), null)) {
                predicates.add(criteriaBuilder.equal(root.get("targetId"), query.getTargetId()));
            }
            if(!ObjectUtil.equals(query.getIsPublic(),null)){
                predicates.add(criteriaBuilder.equal(root.get("isPublic"),query.getIsPublic()));
            }

            if (!ObjectUtil.equals(query.getScope(),null)){
                switch (query.getScope()) {
                    case "followed_by_me":
                        Join<Question, QuestionFollower> questionFollowerJoin = root.join("questionFollowers", JoinType.LEFT);
                        predicates.add(criteriaBuilder.equal(questionFollowerJoin.get("userId"), query.getUserId()));
                        break;
                    case "created_by_me":
                        predicates.add(criteriaBuilder.equal(root.get("user").get("id"), query.getUserId()));
                        break;
                    case "answered_by_me":
                        Join<Question, Answer> answerJoin = root.join("answers", JoinType.LEFT);
                        predicates.add(criteriaBuilder.equal(answerJoin.get("user").get("id"), query.getUserId()));
                        predicates.add(criteriaBuilder.equal(answerJoin.get("isDelete"), false));
                        break;
                }
            }

            criteriaQuery.distinct(true); // 添加distinct关键字，只返回不同的记录
            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(query.getPage()-1,query.getPerPage(), sort);
        return questionRepository.findAll(specification, pageable);
    }

    public JsonResponse getQuestionsList(QuestionQueryRequest query){

        if (query.getTargetId() == null){
            return JsonResponse.error("参数错误，请在楼盘管理中查看问答");
        }

        Page<Question> questions = getListing(query);
        JSONObject data = new JSONObject();
        PageableInfoVo page = new PageableInfoVo(questions.getPageable(),  questions.getTotalPages(), questions.getTotalElements());

        List<AdminQuestionListVo> list = questions.getContent().stream().map(question -> {
            AdminQuestionListVo map = modelMapper.map(question, AdminQuestionListVo.class);
            map.setAnswersCount(answerRepository.countByQuestionIdAndIsDeleteFalse(question.getId()));
            map.setAnswers(answerRepository.findByQuestionIdAndIsDeleteFalse(question.getId()));
            return map;
        }).collect(Collectors.toList());

        data.put("result", list);
        data.put("page", page);
        return JsonResponse.ok(data);
    }

    public JsonResponse getQuestionDetail(Integer id){
        Question question = questionRepository.findById(id).orElse(null);
        if (question == null){
            return JsonResponse.error("参数错误，请在楼盘管理中查看问答");
        }
        AdminQuestionListVo vo = modelMapper.map(question, AdminQuestionListVo.class);
        vo.setAnswersCount(answerRepository.countByQuestionIdAndIsDeleteFalse(question.getId()));
        List<Answer> answerList = answerRepository.findByQuestionIdAndIsDeleteFalse(question.getId());
        answerList.forEach(answer -> {
            User user = answer.getUser();
            BrokerProfile brokerOrNo = brokerProfileService.isBrokerOrNo(user.getId());
            if (brokerOrNo!=null) {//是 置业顾问
                User map = modelMapper.map(brokerOrNo, User.class);
                answer.setUser(map);
            }
        });
        vo.setAnswers(answerList);
        return JsonResponse.ok(vo);
    }

    public JsonResponse createAnswer(AdminAnswerCreateRequest createRequest,Integer userId){
        Answer map = modelMapper.map(createRequest, Answer.class);
        map.setCreatedAt(LocalDateTime.now());
        map.setUpdatedAt(LocalDateTime.now());
        map.setIsDelete(false);
        map.setLikes(0);
        Answer answer = answerRepository.saveAndFlush(map);
        sendSysMessageToQuestioner(createRequest.getQuestionId(),answer);
        adminLogService.createAdminLog(userId,"回答管理","创建回答：【"+answer.getContent()+"】,ID:【"+answer.getId()+"】");
        return JsonResponse.ok("回答成功");
    }

    public JsonResponse deleteAnswer(Integer id,Integer userId){
        Answer answer = answerRepository.findById(id).orElse(null);
        if (answer == null){
            return JsonResponse.error("回答不存在");
        }
        answer.setIsDelete(true);
        answerRepository.saveAndFlush(answer);
        adminLogService.createAdminLog(userId,"回答管理","删除回答：【"+answer.getContent()+"】,ID:【"+answer.getId()+"】");
        return JsonResponse.ok("删除成功");
    }

    @Transactional
    public JsonResponse deleteQuestionAdmin(Integer id,Integer userId){
        Question question = questionRepository.findById(id).orElse(null);
        if (question == null){
            return JsonResponse.error("问题不存在");
        }
        adminLogService.createAdminLog(userId,"问题管理","删除问题：【"+question.getContent()+"】,ID:【"+question.getId()+"】");
        answerRepository.deleteByQuestionId(id);
        questionRepository.deleteById(id);
        return JsonResponse.ok("删除成功");

    }

    public JsonResponse auditingQuestion(Integer qid,Integer userId){
        Optional<Question> questionOptional = questionRepository.findById(qid);
        if (!questionOptional.isPresent()) {
            return JsonResponse.error("问题不存在");
        }
        Question question = questionOptional.get();
        question.setIsPublic(!question.getIsPublic());
        question.setUpdatedAt(LocalDateTime.now());
        Question saved = questionRepository.saveAndFlush(question);
        adminLogService.createAdminLog(userId,"问题管理","审核问题：【"+question.getContent()+"】,ID:【"+question.getId()+"】，状态：【"+saved.getIsPublic()+"】");
        return JsonResponse.ok("修改成功");
    }

    public JsonResponse auditingAnswer(Integer answerId,Integer userId){
        Optional<Answer> answerOptional = answerRepository.findById(answerId);
        if (!answerOptional.isPresent()) {
            return JsonResponse.error("回答不存在");
        }
        Answer answer = answerOptional.get();
        answer.setIsPublic(!answer.getIsPublic());
        answer.setUpdatedAt(LocalDateTime.now());
        Answer saved = answerRepository.saveAndFlush(answer);
        adminLogService.createAdminLog(userId,"回答管理","审核回答：【"+saved.getContent()+"】,ID:【"+saved.getId()+"】，状态：【"+saved.getIsPublic()+"】");
        return JsonResponse.ok("修改成功");
    }

    public JsonResponse weappCreateAnswer(AdminAnswerCreateRequest createRequest){
        Answer map = modelMapper.map(createRequest, Answer.class);
        map.setCreatedAt(LocalDateTime.now());
        map.setUpdatedAt(LocalDateTime.now());
        map.setIsDelete(false);
        map.setLikes(0);
        Answer answer = answerRepository.saveAndFlush(map);

        sendSysMessageToQuestioner(createRequest.getQuestionId(),answer);
        return JsonResponse.ok("回答成功");
    }

    public void sendSysMessageToQuestioner(Integer questionId,Answer answer){
        try {
            Optional<Question> questionOptional = questionRepository.findById(questionId);
            if(!questionOptional.isPresent()){
                log.info("推送消息失败,问题不存在");
                return;
            }
            Question question = questionOptional.get();

            // 自己回答自己的问题不推送消息
            if (question.getUserId().equals(answer.getUserId())) {
                return;
            }

            Integer postId = question.getTargetId();
            Optional<Post> postOptional = postRepository.findById(postId);
            if (!postOptional.isPresent()) {
                log.info("推送消息失败,楼盘不存在");
                return;
            }
            Post post = postOptional.get();
            String postTitle = post.getTitle();
            //您在楼盘【${post_title}】的提问【${question}】收到了一条新的回答：【${answer}】，点击查看详情。
            sysMessageService.sendSysMessage("qa",
                    "您在楼盘【"+postTitle+"】的提问有新的回答",
                    "您在楼盘【"+postTitle+"】的提问【"+question.getContent()+"】收到了一条新的回答：【"+answer.getContent()+"】，点击查看详情。",question.getUserId(),
                    "/pkgQa/pages/qa/qa?id="+questionId);
        }catch (Exception e){
            log.error("推送消息失败，{}",e.getMessage());
        }
    }

    public JsonResponse weappDeleteAnswer(Integer id, Integer userId){
        Answer answer = answerRepository.findById(id).orElse(null);
        if (answer == null){
            return JsonResponse.error("回答不存在");
        }
        if (!answer.getUserId().equals(userId)){
            return JsonResponse.error("非发布回答用户，无权限删除");
        }
        answer.setIsDelete(true);
        answerRepository.saveAndFlush(answer);
        return JsonResponse.ok("删除成功");
    }

    public JsonResponse followQuestion(Integer questionId, Integer userId){
        QuestionFollower questionFollower = new QuestionFollower();
        questionFollower.setQuestionId(questionId);
        questionFollower.setUserId(userId);
        questionFollower.setCreatedAt(LocalDateTime.now());
        questionFollower.setUpdatedAt(LocalDateTime.now());
        questionFollowerRepository.saveAndFlush(questionFollower);
        return JsonResponse.ok("关注成功");
    }

    @Transactional
    public JsonResponse cancleFollowQuestion(Integer questionId, Integer userId){
        questionFollowerRepository.deleteByQuestionIdAndUserId(questionId, userId);
        return JsonResponse.ok("取消关注成功");
    }

    public JsonResponse likeAnswer(Integer answerId){
        Answer answer = answerRepository.findById(answerId).orElse(null);
        if (answer == null){
            return JsonResponse.error("回答不存在");
        }
        answer.setLikes(answer.getLikes() + 1);
        answerRepository.saveAndFlush(answer);
        return JsonResponse.ok(answer.getLikes());
    }

    private WeappQuestionVo getQuestionVo(Question question, Integer questionId, Integer userId){
        WeappQuestionVo map = modelMapper.map(question, WeappQuestionVo.class);
        List<Answer> answers = answerRepository.findByQuestionIdAndIsDeleteFalseAndIsPublicTrue(question.getId());
        if(!answers.isEmpty()){
            List<AnswerVo> answerVoList = answers.stream().map(answer -> {
                AnswerVo answerVo = modelMapper.map(answer, AnswerVo.class);
                BrokerProfile byUserId = brokerProfileService.isBrokerOrNo(answer.getUserId());
                if (byUserId != null) {//置业顾问
                    AdminWeappUserListVo map1 = modelMapper.map(byUserId, AdminWeappUserListVo.class);
                    map1.setIsBroker(true);
                    answerVo.setUser(map1);
                }
                return answerVo;
            }).collect(Collectors.toList());
            map.setAnswer(answerVoList);
            map.setAnswersCount(answers.size());
            map.setFirstAnswer(answerVoList.get(0));
            map.setIsDone(true);
        }
        map.setFollowed(questionFollowerRepository.existsByUserIdAndQuestionId(userId, questionId));
        map.setFollowersCount(questionFollowerRepository.countByQuestionId(questionId));
        if (question.getTargetType().equals("post")) {
            postRepository.findById(question.getTargetId()).ifPresent(post1 -> map.setTargetName(post1.getTitle()));
        }
        return map;
    }

    public JsonResponse getWeappUserQuestionDetail(Integer questionId, Integer userId){
        Question question = questionRepository.findById(questionId).orElse(null);
        if (question == null){
            return JsonResponse.error("数据不存在");
        }
        WeappQuestionVo questionVo = getQuestionVo(question,questionId,userId);
        return JsonResponse.ok(questionVo);
    }

    public JsonResponse getWeappUserQuestionList(QuestionQueryRequest queryDto) {
        Page<Question> listing = getListing(queryDto);
        List<WeappQuestionVo> questionVos = listing.getContent().stream().map(question -> {
            WeappQuestionVo questionVo = getQuestionVo(question, question.getId(), queryDto.getUserId());
            return questionVo;
        }).collect(Collectors.toList());

        List<WeappQuestionVo> collect = questionVos.stream().filter(item -> {
            return !item.getAnswersCount().equals(0);
        }).collect(Collectors.toList());

        JSONObject data = new JSONObject();
        if(queryDto.getScope().equals("answered_by_me")){
            data.put("items",collect);
        }else{
            data.put("items",questionVos);
        }

        data.put("scopes", getWeappUserQuestionScopes(queryDto));

        return JsonResponse.ok(data);
    }

    public JsonResponse getPublicQuestionList(QuestionQueryRequest queryDto){
        Page<Question> listing = getListing(queryDto);

        List<WeappQuestionVo> qas = listing.getContent().stream().map(question -> {
            WeappQuestionVo map = modelMapper.map(question, WeappQuestionVo.class);
            List<Answer> answers = answerRepository.findByQuestionIdAndIsDeleteFalseAndIsPublicTrue(question.getId());
            if(!answers.isEmpty()){
                List<AnswerVo> answerVoList = answers.stream().map(answer -> {
                    BrokerProfile byUserId = brokerProfileService.isBrokerOrNo(answer.getUserId());
                    if (byUserId != null) {//置业顾问
                        User map1 = modelMapper.map(byUserId, User.class);
                        answer.setUser(map1);
                    }
                    AnswerVo answerVo = modelMapper.map(answer, AnswerVo.class);
                    return answerVo;
                }).collect(Collectors.toList());
                map.setAnswer(answerVoList);
                map.setAnswersCount(answers.size());
                map.setFirstAnswer(answerVoList.get(0));
                map.setIsDone(true);
            }
            if (question.getTargetType().equals("post")) {
                postRepository.findById(question.getTargetId()).ifPresent(post -> map.setTargetName(post.getTitle()));
            }
            return map;
        }).collect(Collectors.toList());


        return JsonResponse.ok(qas);

    }

    private List<JSONObject> getWeappUserQuestionScopes(QuestionQueryRequest queryDto){
        JSONObject scopes = new JSONObject();
        queryDto.setScope("created_by_me");
        scopes.put("label", "我的提问");
        scopes.put("value", "created_by_me");
        scopes.put("count", getListing(queryDto).getTotalElements());
        JSONObject scopes1 = new JSONObject();
        queryDto.setScope("answered_by_me");
        scopes1.put("label", "我的回答");
        scopes1.put("value", "answered_by_me");
        Integer answeredByMeCount = answerRepository.countByUserIdAndIsDeleteFalse(queryDto.getUserId());
        scopes1.put("count", answeredByMeCount==null?0:answeredByMeCount);
        JSONObject scopes2 = new JSONObject();
        queryDto.setScope("followed_by_me");
        scopes2.put("label", "我的关注");
        scopes2.put("value", "followed_by_me");
        scopes2.put("count", getListing(queryDto).getTotalElements());
        List<JSONObject> list = new ArrayList<>();
        list.add(scopes);
        list.add(scopes1);
        list.add(scopes2);
        return list;
    }

    /**
     * 小程序用户发布问题
     * @param userId
     * @param questionCreateRequest
     * @return
     */
    public JsonResponse createQuestion(Integer userId, QuestionCreateRequest questionCreateRequest){
        Question question = modelMapper.map(questionCreateRequest, Question.class);
        question.setUser(userRepository.findById(userId).get());
        question.setCreatedAt(LocalDateTime.now());
        question.setUpdatedAt(LocalDateTime.now());
        question.setIsPublic(false);
        Question question1 = questionRepository.saveAndFlush(question);
        if(question1==null)return JsonResponse.error("发布失败");
        return JsonResponse.ok(question1);
    }

    /**
     * 根据userId和QuestionId去删除问题底下的回答记录，之后再删除问题
     * 因为问题和回答是一对多，所以直接调用jpa的save~方法就好
     * 回答可能是多条的，所以自定义SQL，简化代码
     * 随后删除关注的问题
     * @param userId 用户id
     * @param qid 问题id
     * @return
     */
    @Transactional
    public JsonResponse deleteQuestion(Integer userId,Integer qid){
        int rows = answerRepository.updateAnswerIsDelete(userId, qid);
        Question byUserIdAndId = questionRepository.findByUserIdAndId(userId, qid);
        byUserIdAndId.setIsPublic(false);
        byUserIdAndId.setUpdatedAt(LocalDateTime.now());
        Question question = questionRepository.saveAndFlush(byUserIdAndId);
        questionFollowerRepository.deleteByQuestionIdAndUserId(qid,userId);
        if(rows<0 && !(question.getIsPublic().equals(1))){
            return JsonResponse.error("删除失败");
        }
        return JsonResponse.ok("删除成功");
    }
}
