import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Schedule from './pages/Schedule'
import Events from './pages/Events'
import Bylaws from './pages/Bylaws'
import Vote from './pages/Vote'
import MemberMember1Day from './pages/events/MemberMember1Day'
import SrClubChampionship from './pages/events/SrClubChampionship'
import MemberGuest1Day from './pages/events/MemberGuest1Day'
import GentlemensInvitational from './pages/events/GentlemensInvitational'
import MensClubChampionship from './pages/events/MensClubChampionship'
import MemberMember from './pages/events/MemberMember'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="events" element={<Events />} />
          <Route path="events/member-member-1day" element={<MemberMember1Day />} />
          <Route path="events/sr-club-championship" element={<SrClubChampionship />} />
          <Route path="events/member-guest-1day" element={<MemberGuest1Day />} />
          <Route path="events/gentlemens-invitational" element={<GentlemensInvitational />} />
          <Route path="events/mens-club-championship" element={<MensClubChampionship />} />
          <Route path="events/member-member" element={<MemberMember />} />
          <Route path="bylaws" element={<Bylaws />} />
          <Route path="vote" element={<Vote />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
