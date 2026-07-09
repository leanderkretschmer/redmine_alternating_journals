# frozen_string_literal: true

require_relative 'lib/alternating_journals/hooks'

Redmine::Plugin.register :redmine_alternating_journals do
  name        'Redmine Alternating Journals'
  author      'Leander Kretschmer'
  author_url  'https://github.com/leanderkretschmer'
  description 'Wechselnde Hintergrundfarben für Kommentare/Journals auf Ticket-Seiten, pro User konfigurierbar'
  version     '0.1.0'
  url         'https://github.com/leanderkretschmer/redmine_alternating_journals'
  requires_redmine version_or_higher: '6.0.0'
end

RedmineApp::Application.routes.draw do
  post 'alternating_journals/save_color', to: 'alternating_journals_pref#update'
end
