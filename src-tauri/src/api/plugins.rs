/**

use crate::proto::{
    ListPluginsRequest,
    Plugin,
};

use tonic::transport::Channel;

pub struct PluginApi {
    channel: Channel,
}

impl PluginApi {
    pub async fn connect(addr: &str) -> Result<Self, tonic::transport::Error> {
        let channel = Channel::from_shared(addr.to_string())?
            .connect()
            .await?;

        Ok(Self { channel })
    }

    pub async fn list_plugins(&self) -> Result<Vec<Plugin>, tonic::Status> {
        let mut client =
            crate::proto::plugin_service_client::PluginServiceClient::new(
                self.channel.clone(),
            );

        let response = client
            .list_plugins(ListPluginsRequest {
                include_runtime: true,
            })
            .await?;

        Ok(response.into_inner().plugins)
    }
}
**/