# Git History Cleanup Script
# This script will squash all commits into a single commit and clean the history

Write-Host "🧹 Starting Git History Cleanup..." -ForegroundColor Yellow

# Navigate to the repository directory
Set-Location "c:\Users\dipak\OneDrive\Desktop\racing team"

# Check if we're in a git repository
if (-not (Test-Path ".git")) {
    Write-Host "❌ Error: Not a git repository!" -ForegroundColor Red
    exit 1
}

# Create a backup branch (optional safety measure)
Write-Host "📋 Creating backup branch..." -ForegroundColor Blue
git branch backup-before-cleanup

# Create a new orphan branch with no history
Write-Host "🆕 Creating new orphan branch..." -ForegroundColor Blue
git checkout --orphan new-main

# Add all files to staging
Write-Host "📦 Staging all files..." -ForegroundColor Blue
git add .

# Create a single commit with a generic message
Write-Host "💾 Creating single commit..." -ForegroundColor Blue
git commit -m "."

# Delete the old main branch
Write-Host "🗑️ Removing old main branch..." -ForegroundColor Blue
git branch -D main

# Rename the new branch to main
Write-Host "🔄 Renaming branch to main..." -ForegroundColor Blue
git branch -m main

# Force push to replace the remote history
Write-Host "⬆️ Force pushing to remote..." -ForegroundColor Blue
Write-Host "⚠️ WARNING: This will permanently delete all commit history!" -ForegroundColor Red
$confirm = Read-Host "Are you sure you want to continue? (y/N)"

if ($confirm -eq "y" -or $confirm -eq "Y") {
    git push origin main --force
    Write-Host "✅ Git history cleaned successfully!" -ForegroundColor Green
    Write-Host "📝 Your repository now has only one commit with message: '.'" -ForegroundColor Green
    
    # Clean up backup branch (optional)
    $cleanBackup = Read-Host "Do you want to delete the backup branch? (y/N)"
    if ($cleanBackup -eq "y" -or $cleanBackup -eq "Y") {
        git branch -D backup-before-cleanup
        Write-Host "🗑️ Backup branch deleted" -ForegroundColor Blue
    } else {
        Write-Host "💾 Backup branch 'backup-before-cleanup' preserved" -ForegroundColor Blue
    }
} else {
    Write-Host "❌ Operation cancelled" -ForegroundColor Red
    # Restore original branch
    git checkout backup-before-cleanup
    git branch -D new-main
    git checkout -b main
    git branch -D backup-before-cleanup
}

Write-Host "🏁 Script completed!" -ForegroundColor Yellow
