package com.avn.mallproject.service;

import java.util.List;

import com.avn.mallproject.entity.Mall;

public interface MallService {

    Mall addMall(Mall mall);

    Mall getMallById(Long mallId);

    List<Mall> getAllMalls();

    Mall updateMall(Long mallId, Mall mall);

    void deleteMall(Long mallId);
}
