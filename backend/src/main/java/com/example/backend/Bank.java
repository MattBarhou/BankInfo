package com.example.backend;


import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.Year;

@Entity
@Table(name = "Bank")
public class Bank {

    // Bank attributes
    // Auto-generate the primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BankID")
    private Integer bankId;

    @Column(name = "BankName", nullable = false)
    @NotBlank(message = "Bank name cannot be blank")
    @Size(max = 100, message = "Bank name must not exceed 100 characters")
    private String bankName;

    @Column(name = "BankYear", nullable = false)
    @NotNull(message = "Bank year cannot be null")
    private Year bankYear;

    @Column(name = "BankEmp", nullable = false)
    @NotNull(message = "Number of employees cannot be null")
    @Min(value = 1, message = "Bank must have at least 1 employee")
    private Integer bankEmp;

    @Column(name = "BankAddress", nullable = false)
    @NotBlank(message = "Bank address cannot be blank")
    @Size(max = 255, message = "Bank address must not exceed 255 characters")
    private String bankAddress;

    @Column(name = "BankBranches", nullable = false)
    @NotNull(message = "Number of branches cannot be null")
    @Min(value = 0, message = "Number of branches cannot be negative")
    private Integer bankBranches;

    @Column(name = "BankATMs", nullable = false)
    @NotNull(message = "Number of ATMs cannot be null")
    @Min(value = 0, message = "Number of ATMs cannot be negative")
    private Integer bankAtms;

    // Default constructor
    public Bank() {}

    // Constructor with parameters
    public Bank(Integer bankId, String bankName, Year bankYear, Integer bankEmp, String bankAddress, Integer bankBranches, Integer bankAtms) {
        this.bankId = bankId;
        this.bankName = bankName;
        this.bankYear = bankYear;
        this.bankEmp = bankEmp;
        this.bankAddress = bankAddress;
        this.bankBranches = bankBranches;
        this.bankAtms = bankAtms;
    }

    // Getters and setters
    public Integer getBankId() {
        return bankId;
    }

    public void setBankId(Integer bankId) {
        this.bankId = bankId;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public Year getBankYear() {
        return bankYear;
    }

    public void setBankYear(Year bankYear) {
        this.bankYear = bankYear;
    }

    public Integer getBankEmp() {
        return bankEmp;
    }

    public void setBankEmp(Integer bankEmp) {
        this.bankEmp = bankEmp;
    }

    public String getBankAddress() {
        return bankAddress;
    }

    public void setBankAddress(String bankAddress) {
        this.bankAddress = bankAddress;
    }

    public Integer getBankBranches() {
        return bankBranches;
    }

    public void setBankBranches(Integer bankBranches) {
        this.bankBranches = bankBranches;
    }

    public Integer getBankAtms() {
        return bankAtms;
    }

    public void setBankAtms(Integer bankAtms) {
        this.bankAtms = bankAtms;
    }
}
