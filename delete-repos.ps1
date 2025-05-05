# Replace with your GitHub username
$githubUsername = "emmyobonyo"

# List of repository names to delete (no spaces, no full URLs)
$reposToDelete = @(
    'git_test',
'microverseproject2',
'microverse-project'

)

foreach ($repo in $reposToDelete) {
    $fullRepoName = "$githubUsername/$repo"
    Write-Host "Deleting $fullRepoName..."
    gh repo delete $fullRepoName --confirm
}
