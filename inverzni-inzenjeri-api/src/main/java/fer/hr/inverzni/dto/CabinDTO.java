package fer.hr.inverzni.dto;

import fer.hr.inverzni.model.MountainCabin;

public class CabinDTO {

    private String  name;
    private Boolean water;
    private Boolean power;
    private Boolean food;
    private Boolean sleep;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getWater() {
        return water;
    }

    public void setWater(Boolean water) {
        this.water = water;
    }

    public Boolean getPower() {
        return power;
    }

    public void setPower(Boolean power) {
        this.power = power;
    }

    public Boolean getFood() {
        return food;
    }

    public void setFood(Boolean food) {
        this.food = food;
    }

    public Boolean getSleep() {
        return sleep;
    }

    public void setSleep(Boolean sleep) {
        this.sleep = sleep;
    }

    public MountainCabin toMountainCabin() {
        return new MountainCabin(this.getName().trim(), this.getSleep(), this.getFood(), this.getWater(),
            this.getPower());
    }

    @Override
    public String toString() {
        return "CabinDTO{" +
            "name='" + name + '\'' +
            ", water=" + water +
            ", power=" + power +
            ", food=" + food +
            ", sleep=" + sleep +
            '}';
    }

}
