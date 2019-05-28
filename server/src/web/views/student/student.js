(function() {
    // don't have to explicitly wait for DOM ready as "defer" script are only executed after the entire document has been loaded
    // document.addEventListener("DOMContentLoaded", () => {
    //     // DOM ready
    // });

    const uiDataTemplate = document.getElementById("ui-data");
    console.log(uiDataTemplate.innerHTML);
    // const classTemplate = document.getElementById("app-data-class");
    // console.log(classTemplate.innerHTML);

    const uiData = JSON.parse(uiDataTemplate.innerHTML);

    const addMarkBtns = document.getElementsByClassName("add-mark-btn");

    for (const addMarkBtn of addMarkBtns) {
        addMarkBtn.addEventListener("click", function(event) {
            const closestSubjectParent = addMarkBtn.closest(".subject-container"); // find the closest ancestor which matches the selectors
            // const dataset = closestParent.dataset;
            // console.log(closestSubjectParent.dataset.subjectId);
            // console.log(closestSubjectParent.dataset.subjectName);

            const subject = {
                id: closestSubjectParent.dataset.subjectId,
                name: closestSubjectParent.dataset.subjectName
            };

            // console.log(uiData);

            const closestMarkParent = addMarkBtn.closest(".marks-container"); // find the closest ancestor which matches the selectors
            // console.log(closestMarkParent.dataset.test);

            const closestMarkListChild = closestMarkParent.querySelector(".marks-list-container");
            // console.log(closestMarkListChild.dataset.test);

            // li.appendChild(document.createTextNode(name));
            // const markValue = 23;

            const markValueEl = closestMarkParent.querySelector(".mark-value");
            const markValueTmp = markValueEl.value;
            if (!markValueTmp) {
                alert("Lipseste nota!");
                return false;
            }
            const markValue = parseInt(markValueEl.value);
            if (!markValue) {
                alert("Nota trebuie sa fie un numar!");
                return false;
            }

            const markDateEl = closestMarkParent.querySelector(".mark-date");
            const markDate = markDateEl.value;
            // const markId = closestMarkParent.queryElementById();
            const markId = "123";

            // const newMarkTemplate = document.getElementById("new-mark");
            // li.innerHTML = newMarkTemplate.innerHTML;

            // ---------send data
            const url = "/catalog";
            const data = {
                academicYear: uiData.academicYear,
                semester: uiData.semester,
                class: uiData.class,
                student: uiData.student,
                subject,
                itemType: "mark",
                itemValue: markValue,
                itemDate: markDate
            };

            fetch(url, {
                method: "POST", // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(response => console.log("Success:", JSON.stringify(response)))
                .catch(error => console.error("Error:", error));

            const newLi = document.createElement("li");
            newLi.setAttribute("id", markId);

            newLi.innerHTML = `
                <span>${markValue}</span>
                <span class='text-muted'>/ ${markDate}</span>
                <button type='button' class='btn btn-link'>Sterge</button>
            `;

            // const newLi = `
            //     <li id=${markId}>
            //         <span>${markValue}</span>
            //         <span class='text-muted'>/ ${markDate}</span>
            //         <button type='button' class='btn btn-link'>Sterge</button>
            //     </li>
            // `;

            closestMarkListChild.appendChild(newLi);

            // clear input elements
            markValueEl.value = "";
            markDateEl.value = "";

            // console.log(closestMarkListChild.dataset.test);

            // alert(JSON.stringify(data));
        });
    }
    // addMarkBtns[0].addEventListener("click", function() {
    //     alert(112);
    // });
})();
