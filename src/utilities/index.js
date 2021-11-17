/*
 * Author: Nikhil Unni <nikhi.unni@gmail.com>
 * Created Date: Tuesday November 16th 2021
 * Version : 1.0.0
 * Product : Array utility functions
 */

 /**
 * Format request payload based on parent_id
 * 
 * @param {Array} list flattened array
 * @return {Array} return formatted array
*/
 const arrayToTree = list => {
	var map = {}, node, roots = [], i;

	for (i = 0; i < list.length; i += 1) {
		map[list[i].id] = i;
		list[i].children = [];
	}

	for (i = 0; i < list.length; i += 1) {
		node = list[i];
		const parentId = node.parent_id;
		delete node.parent_id;
		if (!!parentId) {
			list[map[parentId]].children.push(node);
		} else {
			roots.push(node);
		}
	}
	return roots;
}

 /**
 * Format request payload based on parent_id
 * 
 * @param {object} content nested object
 * @return {Array} return falttened array
*/
const flattenArray = content => {
	let flattenedArray = []
	Object.values(content).forEach(element => {
		if (Array.isArray(element)) {
			flattenedArray = [...flattenedArray, ...element];
		}
		else {
			flattenedArray.push(element)
		}
	});
	return flattenedArray
}

 /**
 * Format request payload based on parent_id
 * 
 * @param {object} content request payload to process
 * @return {Array} return formatted array of objects
*/
const changeFormat = content => {
	let flattenedArray = flattenArray(content);
	return arrayToTree(flattenedArray);
}

module.exports = {
	changeFormat,
	flattenArray,
	arrayToTree
}