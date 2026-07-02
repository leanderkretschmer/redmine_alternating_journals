# frozen_string_literal: true

require_relative 'lib/alternating_journals/hooks'

Redmine::Plugin.register :redmine_alternating_journals do
  name        'Redmine Alternating Journals'
  author      'Leander Kretschmer'
  author_url  'https://github.com/leanderkretschmer'
  description 'Wechselnde Hintergrundfarben für Kommentare/Journals auf Ticket-Seiten'
  version     '0.0.2'
  url         'https://github.com/leanderkretschmer/redmine_alternating_journals'
  requires_redmine version_or_higher: '6.0.0'
end
