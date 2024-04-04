package org.greenpine.cheeseballoon.member.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.member.application.port.out.AuthPort;
import org.greenpine.cheeseballoon.member.application.port.out.BookmarkPort;
import org.greenpine.cheeseballoon.member.application.port.out.ViewLogPort;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberPersistenceAdapter implements AuthPort, BookmarkPort, ViewLogPort {
}
