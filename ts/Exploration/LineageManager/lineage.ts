class FamilyNode {
	parent: FamilyNode | false;
	familyDebt: number;
	cumulativeDebt: number;

	constructor(parent: FamilyNode | false) {
		this.parent = parent;
		this.familyDebt = 0;
		this.calculateCumulativeDebt();
	}

	calculateCumulativeDebt(): void {

		this.cumulativeDebt = 0;
		let node: FamilyNode = this;
		while (true) {

			this.cumulativeDebt += node.familyDebt;

			if (!node.parent)
				break;
			else
				node = node.parent;
		}
	}

	incrementDebt(): void {
		
		let node: FamilyNode = this;
		while (true) {
			node.familyDebt++;
			if (!node.parent)
				break;
			else
				node = node.parent;
		}
	}
}