package org.greenpine.cheeseballoon.kafkaExample.Config;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.common.requests.CreateTopicsRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;

// 해당 테스트 코드들의 출처 : https://devel-repository.tistory.com/46

@Configuration
@Slf4j
//for a auto-configuration listener container factory
@EnableKafka
public class KafkaConfig {

    public static final String TOPIC1 = "test1";
    public static final String TOPIC2 = "test2";


    @Bean
    public NewTopic topic1() {
        return new NewTopic(TOPIC1, 3, CreateTopicsRequest.NO_REPLICATION_FACTOR);
    }

    @Bean
    public NewTopic topic2() {
        return new NewTopic(TOPIC2, 3, CreateTopicsRequest.NO_REPLICATION_FACTOR);
    }
}