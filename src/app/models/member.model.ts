export class Member {

	
	constructor(public _id: string, 
				public surname: string,
				public name: string,
				public lat: number,
				public lng: number,
				public category: string[],
				public status: string,
				public email: string,
				public password: string){}

}//Eo class Member