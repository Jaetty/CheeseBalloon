package org.greenpine.cheeseballoon.kafkaExample.Services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.greenpine.cheeseballoon.kafkaExample.Config.KafkaConfig;
import org.greenpine.cheeseballoon.kafkaExample.Domain.Topic1Dto;
import org.greenpine.cheeseballoon.kafkaExample.Domain.Topic2Dto;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProducerService {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void produceTopic1(final Topic1Dto topic1Dto) {
        String key = UUID.randomUUID().toString();
        kafkaTemplate.send(KafkaConfig.TOPIC1, key, topic1Dto)
                .whenComplete((result, throwable) -> {
                    if (throwable != null) {
                        log.error("fail to send message, {}", throwable.getMessage());
                    } else {
                        RecordMetadata metadata = result.getRecordMetadata();
                        log.info("kafka로 보낸 message: {}", topic1Dto);
                        log.info("kafka로 보낸 topic: {}", metadata.topic());
                        log.info("kafka로 보낸 partition: {}", metadata.partition());
                        log.info("kafka로 보낸 offset: {}", metadata.offset());
                    }
                });
    }

    public void produceTopic2(final Topic2Dto topic2Dto) {
        String key = UUID.randomUUID().toString();
        kafkaTemplate.send(KafkaConfig.TOPIC2, key, topic2Dto)
                .whenComplete((result, throwable) -> {
                    if (throwable != null) {
                        log.error("fail to send message, {}", throwable.getMessage());
                    } else {
                        RecordMetadata metadata = result.getRecordMetadata();
                        log.info("send message: {}", topic2Dto);
                        log.info("send topic: {}", metadata.topic());
                        log.info("send partition: {}", metadata.partition());
                        log.info("send offset: {}", metadata.offset());
                        log.info("success to send message, topic: {}, partition: {}, offset: {}",
                                metadata.topic(), metadata.partition(), metadata.offset());
                    }
                });
    }
}