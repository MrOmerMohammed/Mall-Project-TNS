package com.avn.mallproject.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.avn.mallproject.entity.MallAdmin;
import com.avn.mallproject.service.MallAdminService;

@RestController
@RequestMapping("/api/mall-admins")
public class MallAdminController {

    private final MallAdminService mallAdminService;

    public MallAdminController(MallAdminService mallAdminService) {
        this.mallAdminService = mallAdminService;
    }

    @PostMapping("/mall/{mallId}")
    public MallAdmin addMallAdmin(@RequestBody MallAdmin admin,
            @PathVariable Long mallId) {
        return mallAdminService.addMallAdmin(admin, mallId);
    }

    @GetMapping("/{id}")
    public MallAdmin getMallAdmin(@PathVariable Long id) {
        return mallAdminService.getMallAdminById(id);
    }

    @GetMapping
    public List<MallAdmin> getAllMallAdmins() {
        return mallAdminService.getAllMallAdmins();
    }

    @DeleteMapping("/{id}")
    public void deleteMallAdmin(@PathVariable Long id) {
        mallAdminService.deleteMallAdmin(id);
    }

    @GetMapping("/user/{userId}")
    public MallAdmin getMallAdminByUserId(@PathVariable Long userId) {
        return mallAdminService.getMallAdminByUserId(userId);
    }
}
