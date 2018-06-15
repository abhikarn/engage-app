export interface UserMaster {
    id: number;
    userName?: string;
    emailId?: string;
    userPassword?: string;
    isActive?: boolean;
    lastLoginDate?: Date;
    dateOfBirth?: Date;
    firstName?: string;
    lastName?: string;
    Name?: string;
    roleId?: number;
    roleName?: string;
    status?: string;
    countryId?: number;
    countryName?: string;
    stateId?: number;
    stateName?: string;
    zoneId?: number;
    zoneName?: string;
    branchId?: number;
    branchName?: string;
    cityId?: number;
    cityName?: string;
    authToken?: string;
    confirmPassword?: string;
    notFirstLogin?: boolean;
}
