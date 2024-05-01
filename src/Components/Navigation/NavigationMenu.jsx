import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
export const navigationOptions =[
    {
        title: "HOME",
        icon: <HomeRoundedIcon/>,
        path: '/home'
    },
    {
        title: "EXPLORE",
        icon: <ExploreRoundedIcon/>,
        path: '/explore'
    },
    {
        title: "NOTIFICATIONS",
        icon: <NotificationsRoundedIcon/>,
        path: '/notifications'
    },
    {
        title: "MESSAGES",
        icon: <MessageRoundedIcon/>,
        path: '/messages'
    },
    {
        title: "LISTS",
        icon: <ListAltRoundedIcon/>,
        path: '/lists'
    },
    {
        title: "COMMUNITIES",
        icon: <GroupsRoundedIcon/>,
        path: '/communities'
    },
    {
        title: "VERIFIED",
        icon: <VerifiedRoundedIcon/>,
        path: '/verify'
    },
    {
        title: "PROFILE",
        icon: <AccountCircleRoundedIcon/>,
        path: '/profile'
    },
    {
        title: "MORE",
        icon: <PendingRoundedIcon/>,
        path: '/more'
    },
]