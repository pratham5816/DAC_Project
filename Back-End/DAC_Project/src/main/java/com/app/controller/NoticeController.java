package com.app.controller;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.Notice;

import com.app.repository.NoticeRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

@RestController
public class NoticeController {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private NoticeRepository noticeRepository;

    @GetMapping("Notice")
    public List<Notice> getNotice(){
        return noticeRepository.findAll();
    } 

    @PostMapping("/Notice")
    public Notice saveNotice(@RequestBody Notice myNotice){
        return noticeRepository.save(myNotice);
    }

    @PostMapping("/Notices")
    public ResponseEntity<String> saveNotice(@RequestBody List<Notice> myNotice){
        
        for(Notice n : myNotice){
        noticeRepository.save(n);
        }

        return ResponseEntity.ok("Success");
    }

    @PutMapping("/Notice/{id}")
    public ResponseEntity<Notice> updateNotice(@PathVariable Long id , @RequestBody Notice myNotice){
        Optional<Notice> temp = noticeRepository.findById(id);
        if(!temp.isPresent()) return ResponseEntity.notFound().build();
        noticeRepository.save(myNotice);

        return ResponseEntity.ok(myNotice);
    
    }

    @DeleteMapping("/Notice/{id}")
    public ResponseEntity<String> deleteNotice(@PathVariable Long id){

        Optional<Notice> temp = noticeRepository.findById(id);

        if(!temp.isPresent()) return ResponseEntity.notFound().build();

        String sql = "DELETE * FROM Notice WHERE id = :myid";

        Query query = entityManager.createNativeQuery(sql, Notice.class);

        query.setParameter("myid" , id);

        return ResponseEntity.ok("Deleted Succesfully id : " + id);

    }

}
