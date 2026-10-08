import { redirect } from 'next/navigation'

import { SYSTEM_HOME_HREF } from '@/shared/constants/routes'

export default function Page() {
  redirect(SYSTEM_HOME_HREF)
}
