package com.avn.mallproject.controller;


import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.avn.mallproject.entity.Mall;
import com.avn.mallproject.service.MallService;

@RestController
@RequestMapping("/api/malls")
public class MallController {

    private final MallService mallService;

    public MallController(MallService mallService) {
        this.mallService = mallService;
    }

    @PostMapping
    public Mall createMall(@RequestBody Mall mall) {
        return mallService.addMall(mall);
    }

    @GetMapping("/{id}")
    public Mall getMall(@PathVariable Long id) {
        return mallService.getMallById(id);
    }

    @GetMapping
    public List<Mall> getAllMalls() {
        return mallService.getAllMalls();
    }

    @PutMapping("/{id}")
    public Mall updateMall(@PathVariable Long id, @RequestBody Mall mall) {
        return mallService.updateMall(id, mall);
    }

    @DeleteMapping("/{id}")
    public void deleteMall(@PathVariable Long id) {
        mallService.deleteMall(id);
    }
}
