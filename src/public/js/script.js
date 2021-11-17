(function () {
	getGithubRepo(1);
})()



function getGithubRepo(page = 1) {
	const base_url = `https://api.github.com/search/repositories?q=node.js&page=${page}&per_page=10`;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			const data = JSON.parse(xhttp.response);
			console.log(data);
			if (data.items && data.items.length) {
				let trow = '';
				data.items.map(repo => {
					trow = trow + `
					<tr>
					<td>${repo.name}</td>
					<td>${repo.description}</td>
					<td><a href=\"${repo.html_url}\" target=\"_blank\">Click here</a></td>
				</tr>
				`
				});
				let pageList = `<li ${page === 1 ? '' : `onclick="javascript:getGithubRepo(${page-1});"`} class="page__numbers"><span class="material-icons">chevron_left</span></li>`;
				for(let i = 0; i < 10; i++) {
					pageList = pageList + `<li onclick="javascript:getGithubRepo(${i+1});" id=${i+1} class="page__numbers ${page === i+1 ? 'active' : ''}"> ${i + 1}</li>`
				}
				pageList = pageList + `<li ${page === 10 ? '' : `onclick="javascript:getGithubRepo(${page+1});"`} class="page__numbers"><span class="material-icons">chevron_right</span></li>`;
			const tbody = document.getElementById('table-body');
			tbody.innerHTML = trow;
			document.getElementById('pagination').innerHTML = pageList;
			}
			else {
				alert('no data');
			}
		}
	};
	xhttp.open("GET", base_url, true);
	xhttp.send();

}