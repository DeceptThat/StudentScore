$(document).ready(function(){
    const students = [
      { id: "6712040", name: "James Brown", participation: 0, quiz: 0, midterm: 0, final: 0, project1: 0, project2: 0 },
      { id: "6712041", name: "Emily Davis", participation: 0, quiz: 0, midterm: 0, final: 0, project1: 0, project2: 0 },
      { id: "6712042", name: "Michael Johnson", participation: 0, quiz: 0, midterm: 0, final: 0, project1: 0, project2: 0 },
      { id: "6712043", name: "Sarah Wilson", participation: 0, quiz: 0, midterm: 0, final: 0, project1: 0, project2: 0 },
      { id: "6712044", name: "David Martinez", participation: 0, quiz: 0, midterm: 0, final: 0, project1: 0, project2: 0 },
      { id: "6712045", name: "Jessica Taylor", participation: 0, quiz: 0, midterm: 0, final: 0, project1: 0, project2: 0 },
      { id: "6712046", name: "Christopher Anderson", participation: 0, quiz: 0, midterm: 0, final: 0, project1: 0, project2: 0 },
      { id: "6712047", name: "Amanda Thomas", participation: 0, quiz: 0, midterm: 0, final: 0, project1: 0, project2: 0 },
      { id: "6712048", name: "Daniel Jackson", participation: 0, quiz: 0, midterm: 0, final: 0, project1: 0, project2: 0 },
      { id: "6712049", name: "Olivia White", participation: 0, quiz: 0, midterm: 0, final: 0, project1: 0, project2: 0 },
    ];

    function calculateGrade(total){
        if (total >= 80) return "A";
        if (total >= 70) return "B";
        if (total >= 60) return "C";
        if (total >= 50) return "D";
        return "F";
    }

    function renderTable(){
        const tbody = $("#table-body");
        tbody.empty();

        students.forEach((student, index) => {
            // FIXED: Calculate total properly across all grades
            const total = student.participation + student.quiz + student.midterm + student.final + student.project1 + student.project2;
            const grade = calculateGrade(total);
            
            // FIXED: Use <tr> instead of <td>
            const tr = $("<tr>").attr("data-index", index);

            tr.append($("<td>").text(student.id));
            tr.append($("<td>").text(student.name));

            // FIXED: Added missing participation and quiz cells
            tr.append($("<td>").addClass("editable participation").text(student.participation));
            tr.append($("<td>").addClass("editable quiz").text(student.quiz));
            tr.append($("<td>").addClass("editable midterm").text(student.midterm));
            
            // FIXED: appedn -> append
            tr.append($("<td>").addClass("editable final").text(student.final));
            
            // FIXED: Added specific classes for project1 and project2
            tr.append($("<td>").addClass("editable project1").text(student.project1));
            tr.append($("<td>").addClass("editable project2").text(student.project2));

            tr.append($("<td>").text(total));

            // FIXED: Corrected CSS syntax
            if (grade == "A"){
                tr.append($("<td>").html("<strong>" + grade + "</strong>").css("color", "green"));
            }
            else if (grade == "F"){
                tr.append($("<td>").html("<strong>" + grade + "</strong>").css("color", "red"));
            }
            else{
                tr.append($("<td>").text(grade));
            }

            tbody.append(tr);
        });
    }
    
    renderTable();

    $("#table-body").on("click", ".editable", function(){
        // FIXED: Defined 'cell' using the clicked element
        const cell = $(this); 

        // FIXED: Replaced undefined 'cloneElement' with 'cell', and fixed parenthesis syntax
        if (cell.find("input").length > 0) return;

        const originalvalue = cell.text();
        const input = $("<input>")
            .attr("type", "number")
            .attr("min", "0")
            .attr("max", "50")
            .val(originalvalue);

        cell.empty().append(input);
        input.trigger("focus");
        
        input.on("keydown", function(e) {
            if(e.key == "Enter") {
                const newValue = parseInt($(this).val(), 10);
                if(!isNaN(newValue) && newValue >= 0 && newValue <= 50){
                    
                    // FIXED: closet -> closest
                    const tr = cell.closest("tr");
                    const index = tr.attr("data-index");

                    let propertyToUpdate = "";
                    if(cell.hasClass("participation")) propertyToUpdate = "participation";
                    if(cell.hasClass("quiz")) propertyToUpdate = "quiz";
                    if(cell.hasClass("midterm")) propertyToUpdate = "midterm";
                    if(cell.hasClass("final")) propertyToUpdate = "final";
                    if(cell.hasClass("project1")) propertyToUpdate = "project1";
                    if(cell.hasClass("project2")) propertyToUpdate = "project2";

                    if (propertyToUpdate) {
                        students[index][propertyToUpdate] = newValue;
                        renderTable();
                    }
                } else {
                    cell.text(originalvalue);
                }
            }
            else if(e.key === "Escape") {
                cell.text(originalvalue);
            }
        });

        
        input.on("blur", function(){
            cell.text(originalvalue);
        });
    });
});