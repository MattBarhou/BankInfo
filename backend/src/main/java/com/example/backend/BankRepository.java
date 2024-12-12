package com.example.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;

public interface BankRepository extends JpaRepository<Bank, Integer> {

    //Get bank by name
    Bank findBankByBankName(String bankName);

    //Delete bank by name
    void deleteBankByBankName(String bankName);

}
