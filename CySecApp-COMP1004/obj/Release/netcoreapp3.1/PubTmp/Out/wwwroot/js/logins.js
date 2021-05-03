//adding logins

const url = "https://localhost:44358/api/logins";

window.onload = () => {

    console.log(window.localStorage.getItem("1"));

    fetchData();

    const saveBtn = document.getElementById("save");
    saveBtn.addEventListener("click", (e) => {
        //This will prevent the page from refreshing
        e.preventDefault();
        PostData().then(() => {
            document.querySelector("form").reset();
            $('#Savealert').toast('show');
            fetchData();
        }).catch(() => {
            document.getElementById("message").innerHTML = 'There was an error saving!';
        });
    });
};

async function fetchData() {
    const raw = await fetch(url);
    const data = await raw.json();
    console.table(data);
    const table = document.createElement("table");
    table.innerHTML = "<tr><th>First name</th><th>Last Name</th><th>Delete</th></tr>";
    data.forEach(({ id, firstName, lastName }) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${firstName}</td><td>${lastName}</td><td><a id="clearentry" class="btn btn-info btn-sm" onclick="deleteId(${id})"><i class="fas fa-trash-alt"></i> Delete</a></td>`;
        table.appendChild(row);
    });
    const div = document.getElementById("viewtables");
    div.replaceChild(table, div.childNodes[0]);
}

async function PostData() {
    const form = document.getElementById("booking");
    const fname = document.getElementById("FirstNameInput").value;
    const lname = document.getElementById("LastNameInput").value;
    console.log({ fname, lname });
    try {
        await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    firstName: fname,
                    lastName: lname
                }
            )
        });
    } catch (e) {
        throw "failed to post";
    }
    return;
}

async function deleteId(id) {
    try {
        await fetch(url + "/" + id, {
            method: "DELETE",
        });
        $('#Deletealert').toast('show');
        document.getElementById("messageedit").value = 'Deleted User!';
        fetchData();
    } catch (e) {
        document.getElementById("messageedit").innerHTML = 'There was an error saving!';
    }
}