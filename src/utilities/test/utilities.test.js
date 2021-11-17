const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { describe, it } = exports.lab = Lab.script();
const { flattenArray, arrayToTree, changeFormat } = require('../index');

const mockInput = {
	"0":
		[{
			"id": 10,
			"title": "House",
			"level": 0,
			"parent_id": null
		}],
	"1":
		[{
			"id": 12,
			"title": "Red Roof",
			"level": 1,
			"parent_id": 10
		},
		{
			"id": 18,
			"title": "Blue Roof",
			"level": 1,
			"parent_id": 10
		},
		{
			"id": 13,
			"title": "Wall",
			"level": 1,
			"parent_id": 10
		}],
	"2":
		[{
			"id": 17,
			"title": "Blue Window",
			"level": 2,
			"parent_id": 12
		},
		{
			"id": 16,
			"title": "Door",
			"level": 2,
			"parent_id": 13
		},
		{
			"id": 15,
			"title": "Red Window",
			"level": 2,
			"parent_id": 12
		}]
};

describe('Array utility functions', () => {
	it('should flatten array', async () => {

		const mockOutput = [{
			"id": 10,
			"title": "House",
			"level": 0,
			"parent_id": null
		}, {
			"id": 12,
			"title": "Red Roof",
			"level": 1,
			"parent_id": 10
		},
		{
			"id": 18,
			"title": "Blue Roof",
			"level": 1,
			"parent_id": 10
		},
		{
			"id": 13,
			"title": "Wall",
			"level": 1,
			"parent_id": 10
		}, {
			"id": 17,
			"title": "Blue Window",
			"level": 2,
			"parent_id": 12
		},
		{
			"id": 16,
			"title": "Door",
			"level": 2,
			"parent_id": 13
		},
		{
			"id": 15,
			"title": "Red Window",
			"level": 2,
			"parent_id": 12
		}];
		expect(flattenArray(mockInput).length).to.equal(7);
	});

	it('should convert flatten array to tree based on parent_id', async () => {

		const mockInput = [{
			"id": 10,
			"title": "House",
			"level": 0,
			"parent_id": null
		}, {
			"id": 12,
			"title": "Red Roof",
			"level": 1,
			"parent_id": 10
		},
		{
			"id": 18,
			"title": "Blue Roof",
			"level": 1,
			"parent_id": 10
		},
		{
			"id": 13,
			"title": "Wall",
			"level": 1,
			"parent_id": 10
		}, {
			"id": 17,
			"title": "Blue Window",
			"level": 2,
			"parent_id": 12
		},
		{
			"id": 16,
			"title": "Door",
			"level": 2,
			"parent_id": 13
		},
		{
			"id": 15,
			"title": "Red Window",
			"level": 2,
			"parent_id": 12
		}];

		const mockOutput = [
			{
				"id": 10,
				"title": "House",
				"level": 0,
				"children": [
					{
						"id": 12,
						"title": "Red Roof",
						"level": 1,
						"children": [
							{
								"id": 17,
								"title": "Blue Window",
								"level": 2,
								"children": []
							},
							{
								"id": 15,
								"title": "Red Window",
								"level": 2,
								"children": []
							}
						]
					},
					{
						"id": 18,
						"title": "Blue Roof",
						"level": 1,
						"children": []
					},
					{
						"id": 13,
						"title": "Wall",
						"level": 1,
						"children": [
							{
								"id": 16,
								"title": "Door",
								"level": 2,
								"children": []
							}
						]
					}
				]
			}
		]
		expect(arrayToTree(mockInput)).to.equal(mockOutput);
	});

	it('should convert nested array and/or nested objects to tree based on parent_id', async () => {

		const mockOutput = [
			{
				"id": 10,
				"title": "House",
				"level": 0,
				"children": [
					{
						"id": 12,
						"title": "Red Roof",
						"level": 1,
						"children": [
							{
								"id": 17,
								"title": "Blue Window",
								"level": 2,
								"children": []
							},
							{
								"id": 15,
								"title": "Red Window",
								"level": 2,
								"children": []
							}
						]
					},
					{
						"id": 18,
						"title": "Blue Roof",
						"level": 1,
						"children": []
					},
					{
						"id": 13,
						"title": "Wall",
						"level": 1,
						"children": [
							{
								"id": 16,
								"title": "Door",
								"level": 2,
								"children": []
							}
						]
					}
				]
			}
		]
		expect(changeFormat(mockInput)).to.equal(mockOutput);
	});
});
