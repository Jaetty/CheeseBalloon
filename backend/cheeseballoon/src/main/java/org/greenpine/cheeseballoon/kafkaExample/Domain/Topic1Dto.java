package org.greenpine.cheeseballoon.kafkaExample.Domain;

import com.fasterxml.jackson.annotation.JsonProperty;

public record Topic1Dto(
        @JsonProperty("id") String id,
        @JsonProperty("message") String message) {
}