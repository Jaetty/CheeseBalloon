package org.greenpine.cheeseballoon.kafkaExample.Controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.greenpine.cheeseballoon.kafkaExample.Domain.Topic1Dto;
import org.greenpine.cheeseballoon.kafkaExample.Domain.Topic2Dto;
import org.greenpine.cheeseballoon.kafkaExample.Services.ProducerService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class KafkaController {
    private final ProducerService producerService;

    @PostMapping(value = "/topic1", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void produceTopic1(@RequestBody Topic1Dto topic1Dto) {
        producerService.produceTopic1(topic1Dto);
    }

    @PostMapping(value = "/topic2", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void produceTopic2(@RequestBody Topic2Dto topic2Dto) {
        producerService.produceTopic2(topic2Dto);
    }
}