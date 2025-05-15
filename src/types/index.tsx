export interface CreateVestingArgs {
    company_name: string;
    mint: string;
  }
  
  export interface CreateEmployeeArgs {
    start_time: Date;
    cliff_time: Date   ;
    end_time: Date   ;
    amount: number;  
    beneficiary: string;
  }