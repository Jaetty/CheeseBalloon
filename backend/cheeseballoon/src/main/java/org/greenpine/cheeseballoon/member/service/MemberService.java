package org.greenpine.cheeseballoon.member.service;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.member.application.port.in.AuthUsecase;
import org.greenpine.cheeseballoon.member.application.port.in.BookmarkUsecase;
import org.greenpine.cheeseballoon.member.application.port.in.ViewLogUsecase;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService implements AuthUsecase, BookmarkUsecase, ViewLogUsecase {
}
