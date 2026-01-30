
/**
use crate::proto::Plugin;

#[derive(serde::Serialize)]
pub struct UiPlugin {
    pub name: String,
    pub game_title: String,
    pub enabled: bool,
}

impl From<Plugin> for UiPlugin {
    fn from(p: Plugin) -> Self {
        let info = p.info.unwrap();
        let config = p.config.unwrap();

        Self {
            name: info.name,
            game_title: info.game_title,
            enabled: config.enabled,
        }
    }
}
**/
