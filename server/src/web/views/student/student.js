(function() {
    // don't have to explicitly wait for DOM ready as "defer" script are only executed after the entire document has been loaded
    // document.addEventListener("DOMContentLoaded", () => {
    //     // DOM ready
    // });

    const studentTemplate = document.getElementById("app-data-student");
    console.log(studentTemplate.innerHTML);
    const classTemplate = document.getElementById("app-data-class");
    console.log(classTemplate.innerHTML);

    const student = JSON.parse(studentTemplate.innerHTML);

    const addMarkBtns = document.getElementsByClassName("add-mark-btn");

    for (const addMarkBtn of addMarkBtns) {
        addMarkBtn.addEventListener("click", function(event) {
            const closestParent = addMarkBtn.closest(".subject-container"); // find the closest ancestor which matches the selectors
            // const dataset = closestParent.dataset;
            console.log(closestParent.dataset.subjectId);
            console.log(closestParent.dataset.subjectName);

            console.log(student.firstName);

            // const studentEl =

            // alert(JSON.stringify(data));
        });
    }
    // addMarkBtns[0].addEventListener("click", function() {
    //     alert(112);
    // });
})();
