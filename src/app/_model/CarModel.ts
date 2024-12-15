export class CarModel {
    //declare car fields
    ownerName: string;
    carId: number;
    make: string;
    model: string;
    year: string;
    color: string;
    mileage: string;
    //constructor to initialize car's fields
    constructor(){
        this.carId = 1
        this.make = ''
        this.model = ''
        this.color = ''
        this.year = ''
        this.mileage = ''
        this.ownerName = ''
    }

}