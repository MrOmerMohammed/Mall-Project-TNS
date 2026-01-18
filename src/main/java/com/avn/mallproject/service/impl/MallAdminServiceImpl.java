package com.avn.mallproject.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.avn.mallproject.entity.Mall;
import com.avn.mallproject.entity.MallAdmin;
import com.avn.mallproject.repository.MallAdminRepository;
import com.avn.mallproject.repository.MallRepository;
import com.avn.mallproject.service.MallAdminService;

@Service
public class MallAdminServiceImpl implements MallAdminService {

    private final MallAdminRepository mallAdminRepository;
    private final MallRepository mallRepository;

    public MallAdminServiceImpl(MallAdminRepository mallAdminRepository,
            MallRepository mallRepository) {
        this.mallAdminRepository = mallAdminRepository;
        this.mallRepository = mallRepository;
    }

    @Override
    public MallAdmin addMallAdmin(MallAdmin admin, Long mallId) {
        Mall mall = mallRepository.findById(mallId).orElse(null);
        admin.setMall(mall);
        return mallAdminRepository.save(admin);
    }

    @Override
    public MallAdmin getMallAdminById(Long adminId) {
        return mallAdminRepository.findById(adminId).orElse(null);
    }

    @Override
    public List<MallAdmin> getAllMallAdmins() {
        return mallAdminRepository.findAll();
    }

    @Override
    public void deleteMallAdmin(Long adminId) {
        mallAdminRepository.deleteById(adminId);
    }

    @Override
    public MallAdmin getMallAdminByUserId(Long userId) {
        return mallAdminRepository.findByUser_UserId(userId);
    }
}
