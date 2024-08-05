package org.greenpine.cheeseballoon.global.redis;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@Component
@RequiredArgsConstructor
public class RedisUtil {
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;
    public void setData(String key, Object value, Long expiredTime){
        redisTemplate.opsForValue().set(key, value, expiredTime, TimeUnit.MILLISECONDS);
    }

    public Object getData(String key){
        return  redisTemplate.opsForValue().get(key);
    }
    public <T> T getData(String key, TypeReference<T> typeReference) {
        try {
            String rawValue = (String)redisTemplate.opsForValue().get(key);
            return objectMapper.readValue(rawValue, typeReference);
        } catch (Exception e) {
            return null;
        }
    }
    public void deleteData(String key){
        redisTemplate.delete(key);
    }
}
