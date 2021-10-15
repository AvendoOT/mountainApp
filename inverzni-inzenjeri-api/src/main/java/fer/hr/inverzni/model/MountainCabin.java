package fer.hr.inverzni.model;

import fer.hr.inverzni.dto.CabinDTO;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "mountain_cabin")
public class MountainCabin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String  name;
    private Boolean sleep;
    private Boolean eat;
    private Boolean water;
    private Boolean power;

    public MountainCabin() {
    }

    public MountainCabin(Long id, String name, Boolean sleep, Boolean canEat, Boolean hasWater, Boolean hasPower) {
        this.id = id;
        this.name = name;
        this.sleep = sleep;
        this.eat = canEat;
        this.water = hasWater;
        this.power = hasPower;
    }

    public MountainCabin(String name, Boolean sleep, Boolean canEat, Boolean hasWater, Boolean hasPower) {
        this.name = name;
        this.sleep = sleep;
        this.eat = canEat;
        this.water = hasWater;
        this.power = hasPower;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getSleep() {
        return sleep;
    }

    public void setSleep(Boolean canSleep) {
        this.sleep = canSleep;
    }

    public Boolean getEat() {
        return eat;
    }

    public void setEat(Boolean canEat) {
        this.eat = canEat;
    }

    public Boolean getWater() {
        return water;
    }

    public void setWater(Boolean hasWater) {
        this.water = hasWater;
    }

    public Boolean getPower() {
        return power;
    }

    public void setPower(Boolean hasPower) {
        this.power = hasPower;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CabinDTO cabinToCabinDTO() {
        CabinDTO cabinDTO = new CabinDTO();
        cabinDTO.setFood(this.getEat());
        cabinDTO.setName(this.getName());
        cabinDTO.setPower(this.getPower());
        cabinDTO.setSleep(this.getSleep());
        cabinDTO.setWater(this.getWater());
        return cabinDTO;
    }

    @Override
    public String toString() {
        return "MountainCabin{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", sleep=" + sleep +
            ", eat=" + eat +
            ", water=" + water +
            ", power=" + power +
            '}';
    }

}
