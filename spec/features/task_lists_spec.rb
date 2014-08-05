require 'rails_helper'
require 'capybara/rails'

feature 'Task lists' do

  scenario 'User can view task lists' do
    create_user email: "user@example.com"
    TaskList.create!(name: "Work List")
    TaskList.create!(name: "Household Chores")

    visit signin_path
    click_on "Login"
    fill_in "Email", with: "user@example.com"
    fill_in "Password", with: "password"
    click_on "Login"
    expect(page).to have_content("Work List")
    expect(page).to have_content("Household Chores")
  end

  scenario "User can create a new task list and see it in 'My Lists'" do
    create_user email: "user@example.com"
    visit signin_path
    click_on "Login"
    fill_in "Email", with: "user@example.com"
    fill_in "Password", with: "password"
    click_on "Login"

    expect(page).to have_link("+ Add Task List")

    click_link("+ Add Task List")

    expect(page).to have_content("Add a task list")
    expect(page).to have_content("Name")
    expect(page).to have_button("Create Task List")

    fill_in "Name", with: "Exercise Tasks"
    click_button("Create Task List")

    expect(page).to have_content("Exercise Tasks")
    expect(page).to have_content("Task List was created successfully!")
  end

  scenario "User cannot provide a blank name when creating a new task list" do
    create_and_signin_user
    click_link("+ Add Task List")

    click_button("Create Task")

    expect(page).to have_content("Your task list could not be created")
  end

  scenario "User can edit a task list" do
    create_and_signin_user
    add_list("Some Tasks")

    expect(page).to have_link("Edit")

    click_link("Edit")

    expect(page).to have_content("Name")
    expect(find_field("Name").value).to eq("Some Tasks")
    expect(page).to have_button("Update Task List")

    fill_in "Name", with: "Some Other Tasks"
    click_button("Update Task List")

    expect(page).to have_content("Your task list was successfully updated!")
    expect(page).to have_content("Some Other Tasks")
  end

  scenario "User can add tasks to a task list" do
    create_and_signin_user
    add_list("Work List")

    within('#new-task') do
      expect(page).to have_link("+ Add Task")
      click_link("+ Add Task")
    end

    expect(page).to have_content("Description")
    expect(page).to have_content("Due date")

    fill_in "Description", with: "Finish adding tests"
    select "2014",  from: "task_due_date_1i"
    select "August",  from: "task_due_date_2i"
    select "6",  from: "task_due_date_3i"
    click_button("Create Task")

    expect(page).to have_content("Task was created successfully!")
    expect(page).to have_content("Finish adding tests")
    expect(page).to have_content("days")
  end

  scenario "User cannot add blank tasks" do
    create_and_signin_user
    add_list("Work List")
    within('#new-task') do
      expect(page).to have_link("+ Add Task")
      click_link("+ Add Task")
    end

    click_button("Create Task")

    expect(page).to have_content("Your task could not be created")
    expect(page).to have_css('#error-description')
  end

  scenario "User can delete tasks" do
    create_and_signin_user
    add_list("Work List")
    create_task("Finish that important thing")

    expect(page).to have_content("Finish that important thing")
    expect(page).to have_button("Delete")

    click_button("Delete")

    expect(page).to_not have_content("Finish that important thing")
    expect(page).to have_content("Task was deleted successfully!")
  end

end

feature 'Logged Out' do

  scenario 'User can click on About to get more information about the app' do
    visit '/'

    expect(page).to have_link("About")

    click_link("About")

    expect(page).to have_content("About")
    expect(page).to have_content("This app is intended")
  end
end




### HELPER METHODS ###

def create_and_signin_user
  create_user email: "user@example.com"
  visit signin_path
  click_on "Login"
  fill_in "Email", with: "user@example.com"
  fill_in "Password", with: "password"
  click_on "Login"
end

def add_list(name)
  click_link("+ Add Task List")
  fill_in "Name", with: name
  click_button("Create Task List")
end

def select_date(date, options = {})
  field = options[:from]
  select date.strftime('%Y'), :from => "#{field}_1i" #year
  select date.strftime('%B'), :from => "#{field}_2i" #month
  select date.strftime('%d'), :from => "#{field}_3i" #day
end

def create_task(description)
  within('#new-task') do
    expect(page).to have_link("+ Add Task")
    click_link("+ Add Task")
  end

  fill_in "Description", with: description
  select "2014",  from: "task_due_date_1i"
  select "August",  from: "task_due_date_2i"
  select "6",  from: "task_due_date_3i"
  click_button("Create Task")
end