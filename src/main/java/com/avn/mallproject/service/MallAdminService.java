package com.avn.mallproject.service;

import java.util.List;
import com.avn.mallproject.entity.MallAdmin;

public interface MallAdminService {

    MallAdmin addMallAdmin(MallAdmin admin, Long mallId);

    MallAdmin getMallAdminById(Long adminId);

    List<MallAdmin> getAllMallAdmins();

    void deleteMallAdmin(Long adminId);
}
