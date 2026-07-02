# frozen_string_literal: true

require_relative 'lib/alternating_journals/hooks'

Redmine::Plugin.register :redmine_alternating_journals do
  name        'Alternating Journals'
  author      'Leander Kretschmer'
  description 'Wechselnde Hintergrundfarben für Kommentare/Journals auf Ticket-Seiten'
  version     '1.0.0'
  requires_redmine version_or_higher: '6.0.0'
end
