package com.restaurantservice.RestaurantApi.enumeration;

public enum UserRoleEnum {
    EMPLOYEE(1, "EMPLOYEE"), CHIEF(2, "CHIEF"), ADMIN(3, "ADMIN");

    private int index;
    private String name;

    private UserRoleEnum(int index, String name) {
        this.index = index;
        this.name = name;
    }

    public int getIndex() {
        return this.index;
    }

    public String getName() {
        return this.name;
    }
}
