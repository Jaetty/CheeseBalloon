package org.greenpine.cheeseballoon.kafkaExample.Services;


import lombok.extern.slf4j.Slf4j;
import org.greenpine.cheeseballoon.kafkaExample.Config.KafkaConfig;
import org.greenpine.cheeseballoon.kafkaExample.Domain.Topic1Dto;
import org.greenpine.cheeseballoon.kafkaExample.Domain.Topic2Dto;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.listener.adapter.ConsumerRecordMetadata;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ConsumerService {

    @KafkaListener(
            topics = KafkaConfig.TOPIC1,
            //consumer.client-id 의 설정을 override하여 consumer를 생성한다.
            clientIdPrefix = "topic1-listener",
            groupId = "${spring.kafka.consumer.group-id}"
    )
    public void listenTopic1(Topic1Dto topic1Dto, ConsumerRecordMetadata metadata) {
        log.info("수신 받은 message: {}", topic1Dto);
        log.info("수신 받은 topic: {}", metadata.topic());
        log.info("수신 받은 partition: {}", metadata.partition());
        log.info("수신 받은 offset: {}", metadata.offset());
    }

    @KafkaListener(
            topics = KafkaConfig.TOPIC2,
            //consumer.client-id 의 설정을 override하여 consumer를 생성한다.
            clientIdPrefix = "topic2-listener",
            groupId = "${spring.kafka.consumer.group-id}"
    )
    public void listenTopic2(Topic2Dto topic2Dto, ConsumerRecordMetadata metadata) {
        log.info("received message: {}", topic2Dto);
        log.info("received topic: {}", metadata.topic());
        log.info("received partition: {}", metadata.partition());
        log.info("received offset: {}", metadata.offset());
    }
}