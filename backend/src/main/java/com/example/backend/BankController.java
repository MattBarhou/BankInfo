package com.example.backend;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/bank")
public class BankController {

    //Bank Repository
    @Autowired
    private BankRepository bankRepository;


    //Get all banks
    @GetMapping
    public List<Bank> getAllBanks(){
        return bankRepository.findAll();
    }

    //Get bank by name
    @GetMapping("/{bankName}")
    public Bank getBankByName(@PathVariable String bankName){

        if (bankName.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bank name cannot be blank");
        }

        return bankRepository.findBankByBankName(bankName);
    }

    //Get bank by ID
    @GetMapping("/id/{bankID}")
    public Bank getBankByID(@PathVariable Integer bankID){

        if (bankID <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID must be a positive integer");
        }

        return bankRepository.findById(bankID).orElse(null);
    }


    // Create a new bank
    @PostMapping
    public Bank createBank(@Valid @RequestBody Bank bank){
        return bankRepository.save(bank);
    }

    //Update bank by name
    @PutMapping("/{bankName}")
    public Bank updateBank(@PathVariable String bankName, @RequestBody Bank bank){

        if (bankName.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bank name cannot be blank");
        }

        // Fetch existing bank
        Bank existingBank = bankRepository.findBankByBankName(bankName);

        if (existingBank == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bank does not exist");
        }


        existingBank.setBankYear(bank.getBankYear());
        existingBank.setBankEmp(bank.getBankEmp());
        existingBank.setBankAddress(bank.getBankAddress());
        existingBank.setBankBranches(bank.getBankBranches());
        existingBank.setBankAtms(bank.getBankAtms());

        return bankRepository.save(existingBank);
    }

    //Update bank by ID
    @PutMapping("/id/{bankID}")
    public Bank updateBankByID(@PathVariable Integer bankID, @Valid @RequestBody Bank bank){

        if (bankID <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bank ID must be a positive integer");
        }

        Bank existingBank = bankRepository.findById(bankID).orElse(null);


        existingBank.setBankName(bank.getBankName());
        existingBank.setBankYear(bank.getBankYear());
        existingBank.setBankEmp(bank.getBankEmp());
        existingBank.setBankAddress(bank.getBankAddress());
        existingBank.setBankBranches(bank.getBankBranches());
        existingBank.setBankAtms(bank.getBankAtms());

        return bankRepository.save(existingBank);
    }


    //Delete bank by name
    @DeleteMapping("/{bankName}")
    public ResponseEntity<String> deleteBank(@PathVariable String bankName){

        try {
            bankRepository.deleteByBankName(bankName);
            return ResponseEntity.ok("Bank deleted successfully");
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bank not found", e);
        }
    }

    //Delete bank by ID
    @DeleteMapping("/id/{bankID}")
    public ResponseEntity<String> deleteBankByID(@PathVariable Integer bankID){

        if (bankID <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID must be a positive integer");
        }

        bankRepository.deleteById(bankID);

        return ResponseEntity.ok("Bank deleted successfully");
    }

}
