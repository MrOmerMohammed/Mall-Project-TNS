package com.avn.mallproject.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.avn.mallproject.entity.Mall;
import com.avn.mallproject.repository.MallRepository;
import com.avn.mallproject.service.MallService;

@Service
public class MallServiceImpl implements MallService {

    private final MallRepository mallRepository;

    public MallServiceImpl(MallRepository mallRepository) {
        this.mallRepository = mallRepository;
    }

    @Override
    public Mall addMall(Mall mall) {
        return mallRepository.save(mall);
    }

    @Override
    public Mall getMallById(Long mallId) {
        return mallRepository.findById(mallId).orElse(null);
    }

    @Override
    public List<Mall> getAllMalls() {
        return mallRepository.findAll();
    }

    @Override
    public Mall updateMall(Long mallId, Mall mall) {
        Mall existingMall = mallRepository.findById(mallId).orElse(null);
        if (existingMall != null) {
            existingMall.setMallName(mall.getMallName());
            existingMall.setLocation(mall.getLocation());
            existingMall.setContactNumber(mall.getContactNumber());
            return mallRepository.save(existingMall);
        }
        return null;
    }

    @Override
    public void deleteMall(Long mallId) {
        mallRepository.deleteById(mallId);
    }
}
