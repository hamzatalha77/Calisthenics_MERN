interface IExercise {
  title: string
  images: string[]
}

interface IPerson {
  sex: IFemale | IMale
  age: number
}

interface IMale {
  sex: 'Male'
  brain: true
}
interface IFemale {
  sex: 'Male'
  brain: true
}

interface Shoes {
  type: Sneakers | Classic
}

interface Sneakers {
  brand: 'Nike' | 'Jordan'
}

interface Classic {
  color: string
}
const shoe: Shoes = {
  type: {
    brand: 'Jordan',
    color: ''
  }
}
