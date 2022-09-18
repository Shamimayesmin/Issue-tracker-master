document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  // e.preventDefault();
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  let issue = { id, description, severity, assignedTo, status };
  console.log(issue)
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
    // console.log(issues)
    
  }
  issues.push(issue);
  // console.log(issues)
  
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const setStatusClosed = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id === id);
  // console.log(currentIssue)
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  // console.log(issues)
  const remainingIssues = issues.filter( issue =>issue.id !== id )
  // console.log(remainingIssues)
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues ()
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  // console.log(issues)

  const issuesList = document.getElementById('issuesList');
  // console.log(issuesList)
  
  issuesList.innerHTML = '';
  

  for (var i = 0; i < issues.length; i++) {
    const issue = document.createElement('div')
    // console.log(issue)
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${status ==='Closed' ? `<del>${description}</del>` :`<span>${description}</span>`}</h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed('${id}')" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
                              </div>`;


      // issuesList.appendChild(issue)
          
  }
}

// fetchIssues()
// submitIssue()