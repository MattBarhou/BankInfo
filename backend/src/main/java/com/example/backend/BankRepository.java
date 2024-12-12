package com.example.backend;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;

public interface BankRepository extends JpaRepository<Bank, Integer> {

    //Get bank by name
    Bank findBankByBankName(String bankName);

    //Delete bank by name
    @Transactional
    @Modifying
    @Query("DELETE FROM Bank b WHERE b.bankName = :bankName")
    void deleteByBankName(String bankName);

}
