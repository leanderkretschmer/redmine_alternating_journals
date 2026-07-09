RedmineApp::Application.routes.draw do
  post 'alternating_journals/save_color', to: 'alternating_journals_pref#update'
end
