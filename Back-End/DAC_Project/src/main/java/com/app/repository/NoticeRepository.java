package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.model.Notice;

public interface NoticeRepository extends JpaRepository<Notice , Long> {

}
