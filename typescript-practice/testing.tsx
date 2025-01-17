interface Type {
	name: string;
	origin: string;
}

interface Animal {
	type: Type;
	name: string;
	weight: number;
}

class Zoo {
	animals: Animal[];

	constructor() {
		this.animals = [];
	}

	addAnimal(animal: Animal) {
		this.animals.push(animal);
	}

	getTotalAnimalWeight(): number {
		return this.animals.reduce(
			(totalWeight, animal) => totalWeight + animal.weight,
			0
		);
	}
}

const myAnimal: Animal = {
	type: { name: "Mammal", origin: "Earth" },
	name: "Lion",
	weight: 180,
};

const secondLion: Animal = {
	type: { name: "Mammal", origin: "Earth" },
	name: "Lion",
	weight: 180,
};

const zoo = new Zoo();
zoo.addAnimal(myAnimal);
zoo.addAnimal(secondLion);

console.log("Total animal weight:", zoo.getTotalAnimalWeight());
