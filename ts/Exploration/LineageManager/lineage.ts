export class FamilyNode {
	parent: FamilyNode | false;
	children: FamilyNode[];
	familyDebt: number;
	cumulativeDebt: number;

	constructor(parent: FamilyNode | false) {
		this.parent = parent;
		this.familyDebt = 0;
		this.cumulativeDebt = 0;
		this.children = [];
	}

	calculateCumulativeDebt(interest: number): void {

		this.cumulativeDebt = 0;
		let node: FamilyNode = this;
		let layers = 0;
		while (true) {
			
			this.cumulativeDebt += node.familyDebt * interest**layers;
			
			if (!node.parent)
				break;
			else
				node = node.parent;

			layers++;
		}
	}

	incrementDebt(amt=1, discount=1.0, tax=0.0): void {
		
		let node: FamilyNode = this;
		let inc = amt;
		while (true) {
			node.familyDebt += inc;
			inc = inc * discount;
			inc += tax * node.familyDebt;
			if (!node.parent)
				break;
			else
				node = node.parent;
		}
	}

	forgiveDebt(amt=0.01): void {
		for (const c of this.children) {
			c.forgiveDebt(amt);
		}
	}
}