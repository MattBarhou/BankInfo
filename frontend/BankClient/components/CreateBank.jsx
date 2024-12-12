import { useState, useEffect } from "react";

export default function CreateBank() {
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankYear: 0,
    bankEmp: 0,
    bankAddress: "",
    bankBranches: 0,
    bankAtms: 0,
  });
}
